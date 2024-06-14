import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Changermotdepasse() {
    const styles = { margin : '50px'}
  return (
    <Form style={styles}>
      <h3>changer mot de passe</h3>
      <Form.Group className="mb-3" controlId="formBasicPassword" style={{margin:'10px'}}>
        <Form.Label>Ancien Mot de passe</Form.Label>
        <Form.Control type="password" placeholder="ancien passeword" style={{borderColor: 'black'}} />
        <Form.Text className="text-muted">
          We'll never share your passeword with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" style={{margin:'10px'}}>
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Password" style={{borderColor: 'black'}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" style={{margin:'10px'}}>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" style={{borderColor: 'black'}} />
      </Form.Group> 
      <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{display:'flex' , flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <input type="checkbox" label="Check me out" style={{borderColor: 'black', display: 'block', margin: '10px'}} className="custom-checkbox"  />
        <label>Check me out</label>
      </Form.Group>
      <Button variant="primary" type="submit" style={{marginBottom:'10px'}}>
        Submit
      </Button>
    </Form>
  );
}

export default Changermotdepasse;
