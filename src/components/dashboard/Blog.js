import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Button } from 'reactstrap';

const Blog = (props) => {
  return (
    <Card>
      <CardImg alt='Card image cap' src={props.image} />
      <CardBody className='p-4'>
        <CardTitle tag='h5'>{props.title}</CardTitle>
        <CardSubtitle>
          {' '}
          <p>{props.sub_title.length > 250 ? `${props.sub_title.slice(0, 250)}...` : props.sub_title}</p>
        </CardSubtitle>
        <CardText className='mt-3'>{props.text}</CardText>
        <Button color={props.color}>Read More</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;
