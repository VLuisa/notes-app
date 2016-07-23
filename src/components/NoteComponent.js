import React, { Component } from 'react';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';
import Draggable from 'react-draggable';
let FontAwesome = require('react-fontawesome');

const NoteBody = (props) => {
  if (props.editing) {
    return (
      <div>
        <Textarea value={props.note.text} onChange={props.onChange} />
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
    this.props.updateNote(this.props.id, { text: event.target.value });
  }
  render() {
    return (
      <Draggable
        handle=".arrows-alt"
        grid={[10, 10]}
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
            </div>
            <div id="alignright">
              <FontAwesome
                className="arrows-alt"
                name="arrows-alt"
              />
            </div>
          </div>
          <div id="note_body">
            <NoteBody onChange={this.handleUpdate} editing={this.state.editing} note={this.props.note} />
          </div>
        </div>
      </Draggable>
    );
  }
}

export default NoteComponent;
