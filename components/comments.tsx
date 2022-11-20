import { CommentType } from "../pages/question/[id]";
import Comment from "./Comment";

function Comments({ comments }: { comments: CommentType[] }) {
  return (
    <ul role="list" className="space-y-4">
      {comments?.map((comment) => (
        <>
          <Comment comment={...comment} />
          <hr />
        </>
      ))}
    </ul>
  );
}

export default Comments;
