<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    //
    public function register(Request $request)
    {
        $messageValidation = '';

        if (!$request->input('name')) {
            $messageValidation = 'Tên là bắt buộc.';
        } else if (!$request->input('email')) {
            $messageValidation = 'Email là bắt buộc.';
        } else if (!Str::endsWith($request->input('email'), '@sun-asterisk.com')) {
            $messageValidation = 'Email phải kết thúc bằng @sun-asterisk.com.';
        } else if (!$request->input('password')) {
            $messageValidation = 'Mật khẩu là bắt buộc.';
        } else {
            $user = User::where('email', $request->input('email'))->first();
            if ($user) {
                $messageValidation = 'Email này đã được sử dụng.';
            }
        }

        if ($messageValidation) {
            return response()->json([
                'message' => $messageValidation,
            ], 422);
        }

        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();
        } catch (QueryException $e) {
            throw new \Exception('Lỗi tạo prfile: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Tài khoản đã được tạo thành công',
            // 'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $messageValidation = '';

        if (!$request->input('email')) {
            $messageValidation = 'Email là bắt buộc.';
        } else if (!Str::endsWith($request->input('email'), '@sun-asterisk.com')) {
            $messageValidation = 'Email phải kết thúc bằng @sun-asterisk.com.';
        } else if (!$request->input('password')) {
            $messageValidation = 'Mật khẩu là bắt buộc.';
        }

        if ($messageValidation) {
            return response()->json([
                'message' => $messageValidation,
            ], 422);
        }


        $email = $request->input("email");
        $user = User::where('email', $email)->first();
        try {
            if (!Auth::attempt($request->only('email', 'password'))) {
                if (!$user) {
                    return response()->json([
                        'type' => 'email',
                        'message' => 'Email không chính xác!',
                    ], 422);
                } else {
                    return response()->json([
                        'type' => 'password',
                        'message' => 'Mật khẩu không chính xác!',
                    ], 422);
                }
            }

            $token = $user->createToken('token_name')->plainTextToken;

            return response()->json([
                'message' => 'Đăng nhập thành công.',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi đăng nhập: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUser(Request $request){
        $id = $request->query('id');
        $user = User::with('style')->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng!',
            ], 404);
        }

        return response()->json([
            'message' => "Lấy thành công thông tin người dùng",
            'user' => $user
        ], 200);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng!',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email',
            'birth' => 'nullable|date',
            'phone' => 'nullable|numeric|unique:users,phone',
            'address' => 'nullable|string|max:255',
            'workplace' => 'nullable|string|max:255',
            'nationality' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'desired_distance' => 'nullable|numeric',
            'price_start' => 'nullable|numeric',
            'price_end' => 'nullable|numeric',
            'style_id' => 'nullable|exists:styles,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('avatar')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->extension();
            $image->storeAs('images', $imageName, 'public');
            $imageName = "/storage/images/$imageName";

            if ($user->avatar) {
                $imageName = basename($user->avatar);
                Storage::delete("public/images/$imageName");
            }    
        }

        $user->avatar = $imageName;
        $user->email = $request->input('email');
        $user->save();

        return response()->json([
            'message' => 'Cập nhật thông tin người dùng thành công!',
            'user' => $user,
        ], 200);
    }
}
