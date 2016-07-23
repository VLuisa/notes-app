// import React from 'react';
import React, { Component } from 'react';

class TitleInput extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ title: event.target.value });
  }
  handleCreate(event) {
    const title = this.state.title.trim();
    event.preventDefault();
    if (!title) {
      return;
    }
    this.props.onCreateClick(title);
    this.setState({ title: '' });
  }
  render() {
    return (
      <form className="titleCreate" onSubmit={this.handleCreate}>
        <input
          type="text"
          placeholder="New note title..."
          value={this.state.title}
          onChange={this.onInputChange}
        />
        <input type="submit" value="Create" />
      </form>
    );
  }
}

export default TitleInput;
