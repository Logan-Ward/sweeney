import {
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import { createUseStyles } from 'react-jss';
import Content from '../components/Content';

const useStyles = createUseStyles({
  aboutImage: {
    maxHeight: 300,
    objectFit: 'cover',
  },
  image: {
    maxWidth: '100%',
    objectFit: 'cover',
  },
});

const employees = [
  {
    description:
      'Devon is the dedicated owner of this expanding small business. He strives to continue to offer more and more high quality construction services to his clients. As well, he takes prides in providing a living for his core employees and teams of sub-contractors.',
    image: 'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/devon-1200w.jpg',
    name: 'Devon Sweeney',
    title: 'Owner, CEO, CFO',
  },
  {
    description:
      'Travis is the one leader that keeps all projects progressing on a daily basis. His extensive experience and strong work ethic gives him the ability to "juggle" many tasks while communicating with the clients and employees/subs. His main goal is to ensure that clients wishes and needs come through in the final product.',
    image: 'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/travis-960w.jpg',
    name: 'Travis Spencer',
    title: 'COO, Project Manager',
  },
];

const About = () => {
  const classes = useStyles();
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3 text-center">About Us</h1>
      </Jumbotron>
      <Container>
        <Content title="This is Our Story">
          <Row className="align-items-center">
            <Col>
              <p>
                Sweeney Restoration, LLC is a full service, licensed residential building contractor
                specializing in historic home renovations and new construction.
              </p>
              <p>LA Residential Building Contractor License # 881928</p>
            </Col>
            <Col>
              <img
                className={classes.image}
                src="https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/img-abt-1440w.jpg"
              />
            </Col>
          </Row>
        </Content>
        <hr />
        <hr />
        <Content title="Company Biography">
          <p>
            SRLLC was established in the wake of hurricane Katrina to provide affordable, quality
            renovations to New Orleans area home owners. In the midst of so many expensive, out of
            town and scam contractors attracted to the region by the amount of work, Devon Sweeney
            found inspiration and established Sweeney Restoration. He was determined to offer a high
            quality renovation service to his friends and referred clients. Since then SRLLC has
            grown to become a full service general contracting company. Experienced in remodel, new
            and historic construction.
          </p>
        </Content>
        <hr />
        <hr />
        <Content title="Who are we?">
          <Row>
            {employees.map(e => (
              <Col key={`employee-${e.name}`}>
                <Card className="h-100">
                  <CardImg
                    top
                    width="100%"
                    src={e.image}
                    alt={`${e.name} profile`}
                    className={classes.aboutImage}
                  />
                  <CardBody>
                    <CardTitle className="display-4">{e.name}</CardTitle>
                    <CardSubtitle className="lead">{e.title}</CardSubtitle>
                    <hr />
                    <CardText>{e.description}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Container>
    </div>
  );
};

export default About;
