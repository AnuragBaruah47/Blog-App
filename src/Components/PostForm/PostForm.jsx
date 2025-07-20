import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../Index";
import appwriteService from "../../AppWrite/Conf";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        statusUpdate: post?.statusUpdate || "active",
        userId: post?.userId || ""
      },
    });

  useEffect(() => {
    if (post) {
      reset({
        title: post.Title || "",
        slug: post.Slug || "",
        content: post.Content || "",
        status: post.Status || "active",
        userId: post.Userid || ""
      });
    }
  }, [post, reset]);
  const submit = async (data) => {
    if (post) {
      const file = data.image && data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      // Check if slug has changed
      const oldSlug = post.Slug;
      const newSlug = data.slug;
      if (oldSlug !== newSlug) {
        // Create new post with new slug
        const newPost = await appwriteService.createPost({
          title: data.title,
          slug: newSlug,
          content: data.content,
          featuredImage: file ? file.$id : post.Featuredimage,
          statusUpdate: data.status,
          userId: post.Userid,
        });
        if (newPost) {
          // Delete old post
          await appwriteService.deletePost(post.$id);
          // Optionally delete old image if replaced
          if (file && post.Featuredimage) {
            await appwriteService.deletFile(post.Featuredimage);
          }
          navigate(`/post/${newPost.$id}`);
        }
      } else {
        // Normal update
        if (file && post.Featuredimage) {
          await appwriteService.deletFile(post.Featuredimage);
        }
        const dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          featuredImage: file ? file.$id : post.Featuredimage,
          statusUpdate: data.status,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData?.userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    } else {
      return "";
    }
  }, []);
  useEffect(() => {
    const subsciption = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subsciption.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.Featuredimage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.Featuredimage)}
              alt={post.Title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;