import { expect } from "chai"
import registerData from "./datafortesting.js";

describe('testone',()=>{
    let server;
    before((done) => {
        done();
    });
    it('should return the home page',async()=>{
        const resp = await fetch('http://localhost:5000/');
        const restext = await resp.text()
        expect(resp.status).to.equal(200)
        
        expect(restext).to.equal('Server is running')
    })
})

describe('testtwo',()=>{
    let server;

    before((done)=>{
        done();
    });

    it('should post the data',async()=>{
        const resp = await fetch('http://localhost:5000/api/register',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registerData)

        })

        expect(resp.status).to.equal(201)

        const respdata = await resp.json()

        expect(respdata.message).to.equal('User created successfully')
    });
});