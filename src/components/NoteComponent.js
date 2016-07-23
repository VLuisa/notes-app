
import React, { Component } from 'react';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
import Draggable from 'react-draggable';
let FontAwesome = require('react-fontawesome');

const NoteBody = (props) => {
  if (props.editing) {
    return (
      <div>
        <TextareaAutosize
          value={props.note.text} onChange={props.handleUpdate}
        />
      </div>
  );
  } else {
    return <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(props.note.text || '') }} />;
  }
};

const EditIcon = (props) => {
  if (props.editing) {
    return (<FontAwesome id="fa-icon"
      className="pencil"
      name="pencil"
      spin
    />);
  } else {
    return (<FontAwesome id="fa-icon"
      className="pencil"
      name="pencil"
    />);
  }
};

class NoteComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate(event) {
    this.props.updateNote(this.props.id, event);
  }
  render() {
    return (
      <Draggable
        handle=".arrows-alt"
        grid={[25, 25]}
        defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        // position={position}
        // onStart={this.onStartDrag}
        onDrag={this.onDrag}
        // onStop={this.onStopDrag}
      >
        <div id="note_comp">
          <div id="note_header">
            <div id="align_left">
              {this.props.note.title}
              <FontAwesome id="fa-icon"
                className="fa-trash"
                name="trash"
                onClick={() => { this.props.onDelete(this.props.id); }}
              />
              <div onClick={() => { this.setState({ editing: !this.state.editing }); }} >
                <EditIcon editing={this.state.editing} />
              </div>
              <NoteBody onChange={(id, event) => this.props.updateNote(id, event)} editing={this.state.editing} note={this.props.note} />
            </div>
            <div id="alignright">
              <FontAwesome
                className="arrows-alt"
                name="arrows-alt"
              />
            </div>
          </div>
          {/* <div>{this.props.text}</div>*/}
        </div>
      </Draggable>
    );
  }
}

export default NoteComponent;
