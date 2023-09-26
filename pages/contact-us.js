/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';
import {
  Col,
  Row,
  Form,
  Container,
  Input,
  Label,
  FormGroup,
  FormFeedback,
  Button,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const Contact = () => {
  const [files, setFiles] = useState(null);
  const [reCapVer, setRecapVer] = useState(true);

  const fName = useRef(null);
  const lName = useRef(null);
  const Email = useRef(null);
  const Phone = useRef(null);
  const descr = useRef(null);
  const pAddr = useRef(null);
  const pType = useRef(null);
  const phase = useRef(null);
  const firmN = useRef(null);
  const reCap = useRef(null);

  const verify = async (token) => {
    if (!token) {
      setRecapVer(true);
      reCap.current.reset();
      return;
    }
    try {
      await axios.post('/api/verifyReCAPTCHA', { token });
      setRecapVer(false);
    } catch {
      reCap.current.reset();
      setRecapVer(true);
    }
  };

  const handleSubmit = async () => {
    let verified = true;
    const tempRefs = {
      Email,
      Phone,
      descr,
      fName,
      lName,
      pAddr,
      pType,
      phase,
    };
    for (const key in tempRefs) {
      if (tempRefs[key].current.matches(':invalid')) {
        verified = false;
        document.getElementById(`${key}-error-banner`).style.display = 'inherit';
      } else {
        document.getElementById(`${key}-error-banner`).style.display = 'none';
      }
    }
    if (!verified) {
      return;
    }

    const formData = new FormData();
    formData.append('firstname', fName.current.value);
    formData.append('lastname', lName.current.value);
    formData.append('email', Email.current.value);
    formData.append('phone', Phone.current.value);
    formData.append('dealname', pAddr.current.value);
    formData.append('phase', phase.current.value);
    formData.append('type', pType.current.value);
    formData.append('firm', firmN.current.value);
    formData.append('description', descr.current.value);

    if (files) {
      for (const key of files.keys()) {
        formData.append(key, files.get(key));
      }
    }

    try {
      await axios.post('/api/addDeal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Array.from(document.getElementsByTagName('input')).forEach((r) => {
        r.value = '';
      });
      Array.from(document.getElementsByTagName('textarea')).forEach((f) => {
        f.value = '';
      });
      Array.from(document.getElementsByTagName('select')).forEach((g) => {
        g.value = '';
      });
      document.getElementById('divHubConfirmation').style.display = 'inherit';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
      document.getElementById('divGenericErrorBanner').style.display = 'inherit';
    }
  };

  return (
    <div>
      <Head>
        <title>Contact Us | Sweeney Restoration</title>
        <meta property="og:title" content="Contact Us | Sweeney Restoration" key="title" />
      </Head>
      <Script src="https://www.google.com/recaptcha/api.js?render=6LcttdgZAAAAADqMr5udsQdCKWQies8zkPSiMZoi" />
      <PageHead title="Contact Us" img="contact.jpg" />
      <Container>
        <Row>
          <Col md={8} className="mb-4">
            {error ? <p className="text-danger">An error occurred please try again.</p> : null}
            {success ? (
              <h3>Thank you for contacting Sweeney Restoration. We will contact you shortly.</h3>
            ) : (
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="firstName">First name</Label>
                    <Input
                      required
                      name="firstName"
                      id="firstName"
                      invalid={!!(formik.touched.firstName && formik.errors.firstName)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    <FormFeedback>Please enter your first name.</FormFeedback>
                  </FormGroup>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="lastName">Last name</Label>
                    <Input
                      required
                      name="lastName"
                      id="lastName"
                      invalid={!!(formik.touched.lastName && formik.errors.lastName)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>Please enter your last name.</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="email">Email</Label>
                    <Input
                      required
                      name="email"
                      id="email"
                      invalid={!!(formik.touched.email && formik.errors.email)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>Please enter a valid email address.</FormFeedback>
                  </FormGroup>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="phone">Phone</Label>
                    <Input
                      required
                      type="tel"
                      name="phone"
                      id="phone"
                      invalid={!!(formik.touched.phone && formik.errors.phone)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>Please enter your phone number.</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="projectPhase">Project Phase</Label>
                    <Input
                      type="select"
                      name="projectPhase"
                      id="projectPhase"
                      invalid={!!(formik.touched.projectPhase && formik.errors.projectPhase)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">-- Select Phase --</option>
                      <option>Idea/Design</option>
                      <option>Architecture in Process</option>
                      <option>Building Plans Complete</option>
                      <option>Other</option>
                    </Input>
                    <FormFeedback>Please select the phase for your project.</FormFeedback>
                  </FormGroup>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="projectType">Project Type</Label>
                    <Input
                      type="select"
                      name="projectType"
                      id="projectType"
                      invalid={!!(formik.touched.projectType && formik.errors.projectType)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">-- Select Type --</option>
                      <option>New Construction</option>
                      <option>Complete Renovation</option>
                      <option>Partial Renovation</option>
                      <option>Addition</option>
                      <option>Commercial</option>
                      <option>Other</option>
                    </Input>
                    <FormFeedback>Please select the project type.</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="address">Project address</Label>
                    <Input
                      required
                      name="address"
                      id="address"
                      invalid={!!(formik.touched.address && formik.errors.address)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>Please enter your project&apos;s address.</FormFeedback>
                  </FormGroup>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="firm">Architecture Firm</Label>
                    <Input
                      name="firm"
                      id="firm"
                      invalid={!!(formik.touched.firm && formik.errors.firm)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormGroup>
                </Row>
                <FormGroup className="flex-grow-1">
                  <Label for="description">Project description</Label>
                  <Input
                    name="description"
                    id="description"
                    type="textarea"
                    invalid={!!(formik.touched.description && formik.errors.description)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">Project Files</Label>
                  <Input
                    id="exampleFile"
                    name="file"
                    type="file"
                    multiple
                    accept=".xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf,.rtf"
                    onChange={(e) => formik.setFieldValue('attachments', e.target.files)}
                  />
                </FormGroup>
                <Button
                  type="submit"
                  block
                  className="mb-4"
                  aria-busy={formik.isSubmitting}
                  disabled={formik.isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Col>
          <Col md={4}>
            <Content title="Office Hours">
              <p className="m-0">Monday 7:30AM - 4:30PM</p>
              <p className="m-0">Tuesday 7:30AM - 4:30PM</p>
              <p className="m-0">Wednesday 7:30AM - 4:30PM</p>
              <p className="m-0">Thursday 7:30AM - 4:30PM</p>
              <p className="m-0">Friday 7:30AM - 4:30PM</p>
              <p className="m-0">Saturday CLOSED</p>
              <p className="m-0">Sunday CLOSED</p>
            </Content>
            <div className="mt-4">
              <Content title="General Information">
                <p className="m-0">4333 Washington Ave.</p>
                <p className="m-0">New Orleans, LA 70125</p>
                <p className="m-0">
                  Phone: <a href="tel:504-533-0007">504-533-0007</a>
                </p>
                <p className="m-0">
                  Email:{' '}
                  <a href="mailto:info@sweeneyrestoration.com">info@sweeneyrestoration.com</a>
                </p>
              </Content>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
