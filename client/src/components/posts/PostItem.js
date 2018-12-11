import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { addLike, removeLike, deletePost } from '../../actions/postActions';

class PostItem extends Component {
  state = {
    initialLikes: 0,
    likes: 0
  };

  componentDidMount() {
    if (this.props.showActions)
      this.setState({
        initialLikes: this.props.post.likes.length,
        likes: this.props.post.likes.length
      });
  }

  findUserLike = likes => {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0)
      return true;
    return false;
  };

  onClickLike = (id, likes) => {
    if (
      !this.findUserLike(likes) &&
      this.state.initialLikes === this.state.likes
    ) {
      this.props.addLike(id);
      this.setState({ likes: this.state.likes + 1 });
    }
  };

  onClickUnlike = (id, likes) => {
    if (
      this.findUserLike(likes) ||
      (this.state.initialLikes < this.state.likes &&
        this.state.initialLikes !== this.state.likes)
    ) {
      this.props.removeLike(id);
      this.setState({ likes: this.state.likes - 1 });
    }
  };

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className='card card-body mb-3'>
        <div className='row'>
          <div className='col-md-2'>
            <Link to={`/profile/user/${post.user}`}>
              <img
                className='rounded-circle d-none d-md-block'
                src={post.avatar}
                alt={post.name}
              />
            </Link>
            <br />
            <p className='text-center'>{post.name}</p>
          </div>
          <div className='col-md-10'>
            <p className='lead'>{post.text}</p>
            {showActions && (
              <span>
                <button
                  onClick={() => this.onClickLike(post._id, post.likes)}
                  type='button'
                  className='btn btn-light mr-1'
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info':
                        this.findUserLike(post.likes) ||
                        this.state.initialLikes < this.state.likes
                    })}
                  />
                  <span className='badge badge-light'>{this.state.likes}</span>
                </button>
                <button
                  onClick={() => this.onClickUnlike(post._id, post.likes)}
                  type='button'
                  className='btn btn-light mr-1'
                >
                  <i className='text-secondary fas fa-thumbs-down' />
                </button>
                <Link to={`/post/${post._id}`} className='btn btn-info mr-1'>
                  Comments
                </Link>
                {post.user === auth.user.id && (
                  <button
                    onClick={() => this.props.deletePost(post._id)}
                    type='button'
                    className='btn btn-danger mr-1'
                  >
                    <i className='fas fa-times' />
                  </button>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
