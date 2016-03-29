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
  render() {
    return (
      <div className="comment-form">
        CommentForm
      </div>
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

let aaa = [
  {
    "author": "Kieran",
    "body": "body1"
  },
  {
    "author": "Kieran",
    "body": "body3"
  },
  {
    "author": "Kieran",
    "body": "body2"
  }
];

class CommentBox extends React.Component {
  constructor(props) {
    super();
    this.status = {
      comments: props.comments || []
    };
  }

  loadDataFromServer() {
    this.setState({comments: aaa});
    console.log(this.status);
    //fetch(this.props.url)
    //  .then((res) => {
    //    return res.json();
    //  })
    //  .then((json) => {
    //    console.log(json);
    //    console.log(this)
    //    this.setState({comments: json});
    //  }.bind(this))
    //  .catch((e) => {
    //    console.log(e);
    //  });
  }

  componentDidMount() {
    this.loadDataFromServer();
  }

  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList comments={this.status.comments}/>
        <CommentForm />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="comments.json" />,
  document.getElementById('app')
);
