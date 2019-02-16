import React from 'react';
import { Box, Heading, Button } from 'grommet';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { connect } from 'react-redux';

import TextButtonCTA from '../../UIComponents/forms/CTAs/TextButtonCTA';
import ErrorText from '../../UIComponents/forms/ErrorMessage';
import TextInputField from '../../UIComponents/forms/TextInputField';
import FormContainer from '../../UIComponents/forms/FormContainer';
import DropMultiSelect from '../../UIComponents/forms/DropMultiSelect';
import ProfileItemCard from '../../UIComponents/cards/ProfileItemCard';
import { getCurrentUserGroups } from '../../../redux/selectors';
import { getUserGroups } from '../../../redux/actions/user';
class ProfileItems extends React.Component {
  state = { showAddItemForm: true };

  render() {
    const { showAddItemForm } = this.state;
    const { groups, getGroups } = this.props;
    console.log(groups);
    return (
      <Box fill align="center" justify="center">
        <Heading level="2">Items</Heading>
        <TextButtonCTA
          onClick={this.showAddItemForm}
          label1="Close"
          label2="Add item"
        />
        {showAddItemForm && this.addItemForm()}
        <Button label="Refresh items" onClick={getGroups} />
        {groups &&
          groups.map(group => {
            return (
              <ProfileItemCard
                name={group.name}
                description={group.description}
              />
            );
          })}
      </Box>
    );
  }

  addItemForm() {
    const { groups } = this.props;
    return (
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: '',
          amount: 1,
          Items: []
        }}
        validationSchema={yup.object().shape({
          name: yup.string().required('Required'),
          description: yup.string().required('Required'),
          price: yup
            .number()
            .moreThan(0)
            .required('Required'),
          amount: yup
            .number()
            .integer()
            .moreThan(0)
            .required('Required'),
          Items: yup.array().of(yup.string())
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const createdItem = await axios.post('/api/item/new', {
            ...values
          });
          setSubmitting(false);
          console.log(createdItem.data);
        }}>
        {({ values, isSubmitting, handleChange, errors, touched }) => (
          <Form>
            <FormContainer>
              <TextInputField
                label="Name"
                name="name"
                onChange={handleChange}
                placeholder="Cucumber"
                value={values.name}
              />
              {errors.name && touched.name && <ErrorText text={errors.name} />}
              <TextInputField
                label="Description"
                name="description"
                onChange={handleChange}
                placeholder="This is a very well rounded cucumber"
                value={values.description}
              />
              {errors.description && touched.description && (
                <ErrorText text={errors.description} />
              )}
              <TextInputField
                label="Price"
                name="price"
                type="number"
                onChange={handleChange}
                placeholder=""
                value={values.price}
              />
              {errors.price && touched.price && (
                <ErrorText text={errors.price} />
              )}
              <TextInputField
                label="Amount"
                name="amount"
                type="number"
                onChange={handleChange}
                placeholder=""
                value={values.amount}
              />
              {errors.amount && touched.amount && (
                <ErrorText text={errors.amount} />
              )}
              <DropMultiSelect items={groups && groups.map(g => g.name)} />
              <AddItemCTA
                align="center"
                type="submit"
                disabled={isSubmitting}
                label="Add Item"
                onClick={this.onSubmit}
              />
            </FormContainer>
          </Form>
        )}
      </Formik>
    );
  }

  showAddItemForm = () =>
    this.setState({ showAddItemForm: !this.state.showAddItemForm });
}

const AddItemCTA = styled(Button)`
  width: fit-content;
  align-self: center;
`;
const mapStateToProps = state => {
  return { groups: getCurrentUserGroups(state) };
};
const mapDispatchToProps = {
  getGroups: getUserGroups
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileItems);
