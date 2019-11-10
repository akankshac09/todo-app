import React from 'react';
import axios from 'axios';
import { Form, Input, Button, Typography, Checkbox, message } from 'antd';
import { withRouter } from 'react-router-dom';

import './todopage.styles.scss';

class TodoPage extends React.Component {
  state = {
    value: "",
    activeBucket: null,
  };

  componentDidMount() {
    this.setupActiveBucket(this.props.match.params.bucketId);
  }
  async setupActiveBucket(bucketId) {
    const activeBucket = (await axios.get(`buckets/${bucketId}`)).data;
    activeBucket.todoItems.sort((item1, item2) => item2.id - item1.id)
    this.setState({
      activeBucket,
      value: "",
    })
  }
  handleCreate = async (e) => {
    const { bucketId } = this.props.match.params;
    const { value } = this.state;
    e.preventDefault();
    if (!value) {
      return;
    }
    const createdItem = (await axios.post('todo-items', {
      name: value,
      bucketId,
    })).data;
    const updatedActiveBucket = { ...this.state.activeBucket };
    updatedActiveBucket.todoItems = [createdItem].concat(updatedActiveBucket.todoItems);
    this.setState({
      activeBucket: updatedActiveBucket,
      value: ''
    });
    message.success("Saved!", 0.2);
  }
  toggle = async (item, index) => {
    const updatedActiveBucket = { ...this.state.activeBucket };
    const updateDoneValue = !item.isDone
    updatedActiveBucket.todoItems[index].isDone = updateDoneValue;
    this.setState({
      activeBucket: updatedActiveBucket,
    });
    await axios.put(`http://localhost:5000/api/todo-items/${item.id}`, {
      isDone: updateDoneValue,
      name: item.name,
    });
    message.success("Saved!", 0.2);
  }
  render() {
    const { activeBucket } = this.state;
    return <div className='container'>
      <Form onSubmit={this.handleCreate} className='todo-input-container'>
        <Input autoFocus value={this.state.value} onChange={(e) => this.setState({
          value: e.target.value,
        })} />
        <Button htmlType="submit" type="primary" className="add-todo">
          Create
        </Button>
      </Form>
      {
        activeBucket && activeBucket.todoItems ? activeBucket.todoItems.map((item, index) => (
          <div key={index}>
            <Checkbox checked={item.isDone} style={{
              paddingRight: 8,
            }} onClick={() => this.toggle(item, index)} />
            <Typography.Text delete={item.isDone} disabled={item.isDone}>
              {item.name}
            </Typography.Text>
          </div>
        )) : []
      }
    </div>
  }
}

export default withRouter(TodoPage);