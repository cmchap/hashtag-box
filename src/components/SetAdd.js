import React from "react";
import { Button, Form, Input, Modal } from "antd";

const SetAddForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onAdd, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          style={{ top: 20 }}
          title="Add a new hashtag set"
          okText="Add"
          onCancel={onCancel}
          onOk={onAdd}
        >
          <Form layout="vertical">
            <Form.Item label="Set Name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input the name of the hashtag set"
                  }
                ]
              })(<Input placeholder="🎉️NewSet" />)}
            </Form.Item>
            <Form.Item label="Hashtags">
              {getFieldDecorator("hashtags", {
                rules: [
                  {
                    required: true,
                    message: "Please input the some hashtags"
                  }
                ]
              })(
                <Input.TextArea autosize placeholder="#Cool #New #Hashtags" />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class SetAddPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleAdd = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log("Received values of form: ", values);
      this.props.addHashtagSet(values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div className="addSetContainer">
        <Button type="normal" onClick={this.showModal}>
          Add New Set
        </Button>
        <SetAddForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onAdd={this.handleAdd}
        />
      </div>
    );
  }
}

// export SetAddForm;
export default SetAddPage;
