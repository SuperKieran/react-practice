class Comment extends React.Component {
  render() {
    return (
      <div>
        <div className="comment-body">
          {this.props.children}
        </div>
        <div className="comment-author">
          {this.props.author}
        </div>
      </div>
    );
  }
}

class CommentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const author = this.refs.author.value;
    const body = this.refs.body.value;
    const form = this.refs.form;

    this.props.onSubmit({author: author, body: body});

    form.reset();
  }

  render() {
    return (
      <form className="comment-form" ref="form" onSubmit={e => {this.handleSubmit(e)}}>
        <input type="text" placeholder="Your Name" ref="author"/>
        <input type="text" placeholder="Input your comment" ref="body"/>
        <input type="submit" value="Add Comment"/>
      </form>
    );
  }
}

class CommentList extends React.Component {
  render() {
    let commentsNode = this.props.comments.map(function (comment, index) {
      return <Comment key={'comment-'+index} author={comment.author}>
        {comment.body}
      </Comment>
    });
    return (
      <div className="comment-list">
        {commentsNode}
      </div>
    );
  }
}

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  loadDataFromServer() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(json => {
        this.setState({comments: json});
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this.loadDataFromServer();
  }

  handleNewComment(comment) {
    const comments = this.state.comments;
    const newComments = comments.concat([comment]);
    this.setState({comments: newComments});

    setTimeout(() => {
      fetch(this.props.url, {
        method: 'POST',
        body: JSON.stringify(comment)
      })
      .then(res => res.json())
      .then(json => this.setState({comments: comments}))
      .catch(e => {
        console.log(e);
        this.setState({comments: comments});
      })
    }, 2000);
  }

  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList comments={this.state.comments}/>
        <CommentForm onSubmit={comment => this.handleNewComment(comment)}/>
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="comments.json" />,
  document.getElementById('app')
);
