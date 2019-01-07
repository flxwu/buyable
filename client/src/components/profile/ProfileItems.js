import React from 'react';
import { Box, Heading } from 'grommet';
import { Formik, ErrorMessage, Form } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import TextButtonCTA from '../form/CTAs/TextButtonCTA';
import TextInputField from '../form/TextInputField';

class ProfileItems extends React.Component {
  state = { showAddItemForm: true };

  render() {
    const { showAddItemForm } = this.state;
    return (
      <Box fill align="center" justify="center">
        <Heading level="2">Items</Heading>
        <TextButtonCTA
          onClick={this.showAddItemForm}
          label1="Add Item"
          label2="Close"
        />
        {showAddItemForm && this.addItemForm()}
      </Box>
    );
  }

  addItemForm() {
    return (
      <Formik
        initialValues={{
          name: 'BAC',
          description: '',
          price: 0,
          amount: 1,
          groups: []
        }}
        validationSchema={
          yup.object().shape({
            name: yup.string().required('Required'),
            description: yup.string().required('Required'),
            price: yup.number().moreThan(0).required('Required'),
            amount: yup.number().integer().moreThan(0).required('Required'),
            groups: yup.array().of(yup.string())
          })
        }
        onSubmit={async (values, { setSubmitting }) => {
          const createdItem = await axios.post('/api/item/new', {
            ...values
          });
          setSubmitting(false);
          console.log(createdItem.data);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <TextInputField label="Name" name="name" id="name" />
            <ErrorMessage name="name" component="div" />
            <TextInputField label="Description" name="description" />
            <ErrorMessage name="description" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Add Item
            </button>
          </Form>
        )}
      </Formik>
    );
  }

  showAddItemForm = () =>
    this.setState({ showAddItemForm: !this.state.showAddItemForm });
}

export default ProfileItems;
