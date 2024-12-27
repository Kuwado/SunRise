<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\LocationService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    private $locationService;
    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }
    //
    public function register(Request $request)
    {
        $messageValidation = '';

        if (!$request->input('name')) {
            $messageValidation = '名前は必須です。';
        } else if (!$request->input('email')) {
            $messageValidation = 'メールアドレスは必須です';
        } else if (!Str::endsWith($request->input('email'), '@sun-asterisk.com')) {
            $messageValidation = 'メールアドレスは @sun-asterisk.com で終わる必要があります。';
        } else if (!$request->input('password')) {
            $messageValidation = 'パスワードは必須です。';
        } else {
            $user = User::where('email', $request->input('email'))->first();
            if ($user) {
                $messageValidation = 'このメールアドレスはすでに使用されています。';
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
            throw new \Exception('プロフィール作成エラー:' . $e->getMessage());
        }

        return response()->json([
            'message' => 'アカウントが正常に作成されました。',
            // 'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $messageValidation = '';

        if (!$request->input('email')) {
            $messageValidation = 'メールアドレスは必須です。';
        } else if (!Str::endsWith($request->input('email'), '@sun-asterisk.com')) {
            $messageValidation = 'メールアドレスは@sun-asterisk.comで終わる必要があります。';
        } else if (!$request->input('password')) {
            $messageValidation = 'パスワードは必須です。';
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
                        'message' => 'メールアドレスが正しくありません！',
                    ], 422);
                } else {
                    return response()->json([
                        'type' => 'password',
                        'message' => 'パスワードが正しくありません！',
                    ], 422);
                }
            }

            $token = $user->createToken('token_name')->plainTextToken;

            return response()->json([
                'message' => 'ログインに成功しました。',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'ログインエラー: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUser(Request $request)
    {
        $id = $request->query('id');
        $user = User::with('style')->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'ユーザーが見つかりません！',
            ], 404);
        }

        return response()->json([
            'message' => "ユーザー情報の取得に成功しました。",
            'user' => $user
        ], 200);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'ユーザーが見つかりません！',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            // 'avatar' => 'nullable|string|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $id,
            'phone' => 'nullable|numeric|unique:users,phone,' . $id,
            'birth' => 'nullable|date',
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
                'message' => '無効なデータです。',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('avatar')) {
            $image = $request->file('avatar');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('images', $imageName, 'public');
            $imagePath = "/storage/images/$imageName";

            // Xóa ảnh cũ nếu tồn tại
            if ($user->avatar) {
                $oldImageName = basename($user->avatar);
                Storage::delete("public/images/$oldImageName");
            }

            $user->avatar = $imagePath;
        }

        $user->name = $request->input('name', $user->name);
        $user->email = $request->input('email', $user->email);
        $user->birth = $request->input('birth', $user->birth);
        $user->phone = $request->input('phone', $user->phone);
        $user->address = $request->input('address', $user->address);
        $user->workplace = $request->input('workplace', $user->workplace);
        $user->nationality = $request->input('nationality', $user->nationality);
        $user->city = $request->input('city', $user->city);
        $user->desired_distance = $request->input('desired_distance', $user->desired_distance);
        $user->price_start = $request->input('price_start', $user->price_start);
        $user->price_end = $request->input('price_end', $user->price_end);
        $user->style_id = $request->input('style_id', $user->style_id);

        if ($request->filled('address')) {
            $locations = $this->locationService->getCoordinates($request->input('address'));
            if (!$locations) {
                return response()->json([
                    'message' => '住所が無効です。',
                ], 422);
            }

            $user->longitude = $locations['lng'];
            $user->latitude = $locations['lat'];
        }

        $user->save();

        return response()->json([
            'message' => 'ユーザー情報の更新に成功しました！',
            'user' => $user,
        ], 200);
    }
}
