
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
          defaultValue={props.note.text}
          // onChange={e => props.onUpdateChange(event.target.value)}
          onChange={props.onUpdate}
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
  }
  // onDrage()

  // updateNote(id, event) {
  //   this.setState({
  //     notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text: event.target.value }); }),
  //   });
  // }

  render() {
    return (
      <Draggable
        handle=".arrows-alt"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
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
              <NoteBody onUpdate={() => { this.props.onUpdateNote(this.props.id, event); }} editing={this.state.editing} note={this.props.note} />
            </div>
            <div id="alignright">
              <FontAwesome
                className="arrows-alt"
                name="arrows-alt"
              />
            </div>
          </div>
          <div>{this.props.text}</div>
        </div>
      </Draggable>
    );
  }
}

export default NoteComponent;
