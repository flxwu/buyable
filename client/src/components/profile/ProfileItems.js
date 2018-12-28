import React from 'react';
import { Box, Heading } from 'grommet';
import { Formik, ErrorMessage, Form, Field } from 'formik';

import TextButtonCTA from '../form/CTAs/TextButtonCTA';

class ProfileItems extends React.Component {
  state = { showAddItemForm: false };

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
          name: '',
          description: '',
          price: 0,
          amount: 1,
          groups: []
        }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
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
