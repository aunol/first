import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Collapse, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import AddPost from './AddPost'; // Import AddPost component
import ReadPost from './ReadPost'; // Import ReadPost component

const MyPosting = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const postsPerPage = 10;

  // Fetch posts from an API
  const fetchPosts = async () => {
    const userId = localStorage.getItem('userId'); // Replace with the actual user ID

    try {
      const response = await axios.post('https://api.example.com/postList', { param: userId }); // Replace with your API URL
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPosts();
    }
  }, [isOpen]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleAddPost = () => {
    setIsPosting(true);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4" className="d-flex justify-content-between align-items-center">
            My Posting
            <div>
              <Button
                onClick={handleAddPost}
                color="primary"
                size="sm"
              >
                추가
              </Button>
              <Button
                color="link"
                onClick={handleToggle}
                className="ml-2"
              >
                {isOpen ? 'Hide Posts' : 'Show Posts'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Collapse isOpen={isOpen}>
            {posts.length > 0 ? (
              <>
                <ul>
                  {currentPosts.map((post, index) => (
                    <li key={index}>
                      <a
                        href="#!"
                        onClick={() => handlePostClick(post)}
                      >
                        <strong>{post.title}</strong> - {post.date}
                      </a>
                    </li>
                  ))}
                </ul>
                <Pagination>
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      previous
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem active={index + 1 === currentPage} key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink
                      next
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </Pagination>
              </>
            ) : (
              <p>등록된 포스팅이 없습니다.</p>
            )}
          </Collapse>
        </CardBody>
      </Card>

      {isPosting && <AddPost onClose={() => setIsPosting(false)} onPostAdded={fetchPosts} />}
      {selectedPost && <ReadPost post={selectedPost} onClose={() => setSelectedPost(null)} onPostUpdated={fetchPosts} />}
    </>
  );
};

export default MyPosting;
