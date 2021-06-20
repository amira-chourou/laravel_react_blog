<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'update', 'destroy','show']);
    }

    public function index()
    {

            $posts = Post::with( 'user','comments')->orderBy('updated_at', 'DESC')->paginate(10);

        return response()->json(['data' => $posts], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *

     */
    public function store(Request $request)
    {

        $this->validate($request, [

            'content' => 'required',

        ]);
        $post = new Post();
        $post->content = $request->input('content');

        $post->user_id = auth("api")->user()->id;
        $post->created_at= new \DateTime();
        $post->updated_at= new \DateTime();

        $post->save();

        $post=  Post::with( 'user',  'comments')->findOrFail($post->id);

        return response()->json(['data' => $post, 'message' => 'Created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::with( 'user',  'comments')->findOrFail($id);

        return response()->json(['data' => $post], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *

     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
       \Log::debug('url: ' . $request);
        $rules = [

            'content' => '',

        ];

        $this->validate($request, $rules);

        $post->content = $request->input("body");
        $post->updated_at= new \DateTime();

        \Log::debug('url: ' . $post);
        $post->save();

        $post=  Post::with( 'user',  'comments')->findOrFail($post->id);
        return response()->json(['data' => $post, 'message' => 'Updated successfully'], 200);

        }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $post = Post::findOrFail($id);


        $post->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
