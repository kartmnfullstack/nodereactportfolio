import { render,screen } from "@testing-library/react";
import Main from "./parts/Main";
import userEvent from "@testing-library/user-event"
import { Header } from "./parts/Header";
import { LoginProvider } from './auth/Context'
import { MemoryRouter,Routes,Route } from "react-router-dom";
import Login from "./parts/Login";
import { expect } from "vitest";


test("Main heading",()=>{
    render(<Main/>)
    const heading = screen.getByText(/Main Content/i);
    expect(heading).toBeInTheDocument();
})

test("Main content",()=>{
    render(<Main/>)
    const content = screen.getByText(/Ducimus suscipit/i);
    expect(content).toBeInTheDocument();
})

test("Main head",()=>{
    render(<Main/>)
    const content = screen.getByRole("heading",{name: /Main Content/i});
    expect(content).toBeInTheDocument();
})

test("Home Page Link",()=>{
    render( 
    <MemoryRouter>
        <LoginProvider>
        <Header />
        </LoginProvider>
    </MemoryRouter>    
    )
    const b = screen.getByRole("link",{name: /Home/i})
    expect(b).toBeInTheDocument();
})

test("Login Page Button",()=>{
    render( 
    <MemoryRouter>
        <LoginProvider>
        <Login />
        </LoginProvider>
    </MemoryRouter>    
    )
    const b = screen.getByRole("button",{name: /Login/i})
    expect(b).toBeInTheDocument();
})

test("Clicking navigates to Register",async()=>{
     render( 
    <MemoryRouter initialEntries={['/login']}>
        <LoginProvider>
            <Header/>
            <Routes>
                    <Route path="/register" element={<button>Register</button>} />
                </Routes>
        </LoginProvider>
    </MemoryRouter>    
    )

    const b = screen.getByRole("link",{name: /Register/i})

    await userEvent.click(b)

    const Pagecontent = screen.getByRole("button",{name: /Register/i})

    expect(Pagecontent).toBeInTheDocument();

})

test("Clicking navigates to Login",async()=>{
     render( 
    <MemoryRouter initialEntries={['/']}>
        <LoginProvider>
            <Header/>
            <Routes>
                    <Route path="/login" element={<button>Login</button>} />
                </Routes>
        </LoginProvider>
    </MemoryRouter>    
    )

    const b = screen.getByRole("link",{name: /Login/i})

    await userEvent.click(b)

    const Pagecontent = screen.getByRole("button",{name: /Login/i})

    expect(Pagecontent).toBeInTheDocument();

})