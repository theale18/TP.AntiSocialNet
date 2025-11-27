import { Link } from 'react-router-dom';
import { Post } from '../types';

import '../styles/PostCard.css';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card fade-in">
      <div className="post-content">
{/*_____________________________USUARIO_________________________________________________________________________*/}
        <div className="post-author">
          <span className="author-icon"></span>
          <span className="author-name">{post.User?.nickName || 'Anonimo'}</span>
        </div>

{/*_____________________________FECHA_________________________________________________________________________*/}
        <span className="post-date">
          {new Date(post.createdAt).toLocaleDateString('es-AR')}
        </span>
      </div>

{/*_____________________________POST_________________________________________________________________________*/}
      <div className="post-card-body">
        <p className="post-description">{post.description}</p>

        {post.PostImages && post.PostImages.length > 0 && (
          <div className="post-images">
            {post.PostImages.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt="Post"
                className="post-image"
              />
            ))}
          </div>
        )}
{/*_____________________________HASHTAG DEL POST_________________________________________________________________________*/}
        {post.Tags && post.Tags.length > 0 && (
          <div className="post-tags">
            {post.Tags.map((tag) => (
              <span key={tag.id} className="post-tag">
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
{/*_____________________________PIE DE POST_________________________________________________________________________*/}
      <div className="post-footer">
        <span className="comment-count">
          Comentarios: {post.commentCount || 0}
        </span>
        <Link to={`/post/${post.id}`} className="btn-more">
          VER MAS →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;