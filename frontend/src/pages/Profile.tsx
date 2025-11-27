import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Post } from '../types';
import { getPostsByUserId, getCommentsByPostId, getImagesByPostId } from '../api/api';

import '../styles/profile.css';


const Perfil = () => {
  const { user, logout } = useAuth();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;

      try {
        // Usar el endpoint correcto con query param userId
        const userPostsData = await getPostsByUserId(user.id);

        // Obtener el conteo de comentarios e imágenes para cada post
        const postsWithDetails = await Promise.all(
          userPostsData.map(async (post) => {
            try {
              const [comments, images] = await Promise.all([
                getCommentsByPostId(post.id),
                getImagesByPostId(post.id)
              ]);
              return { 
                ...post, 
                commentCount: comments.length,
                PostImages: images
              };
            } catch {
              return { ...post, commentCount: 0, PostImages: [] };
            }
          })
        );

        setUserPosts(postsWithDetails);
      } catch (err) {
        console.error('Error al cargar publicaciones del usuario:', err);
        setError('No se pudieron cargar tus publicaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);


  
/*_____________________________HTML_________________________________________________________________________*/
  return (
    <div className="profile-container">
      <div className="perfil-header">
        <div className="perfil-info">
          <div className="perfil-avatar">
            <img src="/public/logo.png" alt="Logotipo" width="80" height="80">
            </img>
          </div>
          <div className="perfil-details">
            <h1 className="perfil-nickname">
              Usuario: {user?.nickName}
            </h1>
            <p className="perfil-email">
              Correo Electronico: {user?.email}
            </p>
            <p className="perfil-stats">
              Tengo {userPosts.length} {userPosts.length === 1 ? 'publicación' : 'publicaciones'}
            </p>
          </div>
        </div>
        <button onClick={logout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>


{/*//_____________________________MIS PUBLICACIONES_________________________________________________________________________*/}
      <section className="perfil-posts">
        <h2 className="section-title">Mis Publicaciones</h2>
        
        {error && <div className="error-message">{error}</div>}

        {userPosts.length === 0 ? (
          <div className="empty-state">
            <p>Aún no has creado ninguna publicación.</p>
            <Link to="/crear-post" className="empty-state-link">
              Crear mi primera publicación →
            </Link>
          </div>
        ) : (
//_____________________________POSTS DEL PERFIL_________________________________________________________________________*/}

          <div className="posts-list">
            {userPosts.map((post) => (
              <div key={post.id} className="perfil-post-card">
                <div className="perfil-post-content">
                  <p className="perfil-post-description">{post.description}</p>
                  
                  {post.Tags && post.Tags.length > 0 && (
                    <div className="perfil-post-tags">
                      {post.Tags.map((tag) => (
                        <span key={tag.id} className="perfil-tag">
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
{/*_____________________________FECHAS DE LOS POSTS_________________________________________________________________________*/}
                  <div className="perfil-post-meta">
                    <span className="perfil-post-date">
                      FECHA: {new Date(post.createdAt).toLocaleDateString('es-AR')}
                    </span>
                    <span className="perfil-post-comments">
                      COMENTARIOS: {post.commentCount || 0}
                    </span>
                  </div>
                </div>

                <Link to={`/post/${post.id}`} className="btn-more">
                  VER MAS →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Perfil;