import { React, Component } from 'react';
import { Button, Form, Row, Container, Col, Table  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
  constructor(){
    super();
    this.state = {
      title : "React Js CRUD App",
      act : 0,
      idx : '',
      datas : []
    }
  }

  componentDidMount(){
    this.refs.txtName.focus();
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    let datas = this.state.datas;
    let name = this.refs.txtName.value;
    let email = this.refs.txtEmail.value;
    let phno = this.refs.txtPhno.value;

    if(this.state.act === 0)
    {
      let data = {
        "name" : name,
        "email" : email,
        "phno" : phno
      }
      datas.push(data);
    }
    else
    {
        let index = this.state.idx;
        datas[index].name = name;
        datas[index].email = email;  
        datas[index].phno = phno;        
    }
    
    this.setState({
      datas : datas,
      act : 0
    })
    this.refs.myForm.reset();
    this.refs.txtName.focus();
  }

  handleDelete = (index) =>{
    let datas = this.state.datas;
    datas.splice(index,1);
    this.setState({
      datas:datas
    })
    this.refs.txtName.focus();
  }

  handleEdit = (index) => {
    let data = this.state.datas[index];
    this.refs.txtName.value = data.name;
    this.refs.txtEmail.value = data.email;
    this.refs.txtPhno.value = data.phno;
    this.setState({
      act: 1,
      idx : index
    })
  }
render() {

  let datas = this.state.datas;
  return(
    <div>
    <Container>
    <Row className="justify-content-md-center">
      <Col xs lg="6">
        <h2 className='text-center title'>{this.state.title}</h2>
        <Form ref="myForm" className="mb-3 card-body">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref="txtName" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref="txtEmail" placeholder="Enter Email Address" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone no</Form.Label>
            <Form.Control type="text" ref="txtPhno" placeholder="Enter Phone number" />
          </Form.Group>
          <Button onClick={ e => this.handleSubmit(e) } variant="success" className='content-center'><i className='fa fa-square'></i> Submit</Button>
        </Form>
      </Col>
    </Row>
    <Row>
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>S. No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone no</th>
        <th colspan="2">Action</th>
      </tr>
      </thead>
      <tbody>
      {datas.map((data,index)=>
        <tr key={index}>
          <td>{index+1}</td>
          <td>{data.name}</td>
          <td>{data.email}</td>
          <td>{data.phno}</td>
          <td>
            <Button onClick={e => this.handleEdit(index)} className="primary ml-10"><i className='fa fa-edit'></i></Button>
            <Button onClick={e => this.handleDelete(index)} variant="danger"><i className='fa fa-trash'></i></Button>
          </td>
        </tr> )
      }
      </tbody>
    </Table>
    </Row>
    </Container>
    </div>
  )
}
}

export default App;