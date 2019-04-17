import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { Box, Button, Heading } from 'grommet';
import axios from 'axios';
import * as yup from 'yup';
import ErrorText from '../../UIComponents/forms/ErrorMessage';
import TextInputField from '../../UIComponents/forms/TextInputField';
import FormContainer from '../../UIComponents/forms/FormContainer';
import DropMultiSelect from '../../UIComponents/forms/DropMultiSelect';

class SellView extends Component {
  render() {
    const groups = [{ name: 'asdf' }, { name: 'jkl;' }];
    return (
      <Box>
        <Heading alignSelf="center" level="2">
          Sell an item!
        </Heading>
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
                {errors.name && touched.name && (
                  <ErrorText text={errors.name} />
                )}
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
                  label="Sell"
                  onClick={this.onSubmit}
                />
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Box>
    );
  }
}

const AddItemCTA = styled(Button)`
  width: fit-content;
  align-self: center;
`;

export default SellView;
