import fs from "fs";
import path from "path";
import { GetServerSideProps } from "next";
import { Header } from "../../components/Header";

interface LoginProps {
  market: string;
  loggedIn?: boolean;
  error?: string;
}

export default function LoginPage({ market, loggedIn, error }: LoginProps) {
  if (loggedIn) {
    return (
      <div style={pageStyle}>
        <Header market={market} />
        <main style={mainStyle}>
          <h1 style={titleStyle}>You are logged in!</h1>
          <p style={paragraphStyle}>Market: {market}</p>
        </main>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Header market={market}/>
      <main style={mainStyle}>
        <h1 style={titleStyle}>Login – Market: {market}</h1>
        {error && <p style={errorStyle}>{error}</p>}
        <form method="POST" style={formWrapperStyle}>
          <div style={formItemStyle}>
            <label htmlFor="username" style={labelStyle}>Username:</label>
            <input id="username" name="username" style={inputStyle}/>
          </div>
          <div style={formItemStyle}>
            <label htmlFor="password" style={labelStyle}>Password:</label>
            <input id="password" name="password" type="password" style={inputStyle}/>
          </div>
          <button type="submit" style={buttonStyle}>Log in</button>
        </form>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<LoginProps> = async (ctx) => {
  const {market} = ctx.params!;
  const method = ctx.req.method;

  const props: LoginProps = {market: market as string};

  if (method === "POST") {
    const bodyDataString = await readRequestBodyAsString(ctx.req);
    const formData = new URLSearchParams(bodyDataString);
    const username = formData.get("username");
    const password = formData.get("password");

    const usersPath = path.join(process.cwd(), "data", "users.json");
    const usersRaw = fs.readFileSync(usersPath, "utf-8");
    const users = JSON.parse(usersRaw) as { username: string; password: string }[];

    const matchedUser = users.find(
        (u) => u.username === username && u.password === password
    );
    if (matchedUser) {
      props.loggedIn = true;
    } else {
      props.error = "Invalid credentials!";
    }
  }

  return { props };
};

async function readRequestBodyAsString(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", (err: any) => reject(err));
  });
}

const pageStyle: React.CSSProperties = {
  fontFamily: "'Trebuchet MS', sans-serif",
  backgroundColor: "#2e2e2e",
  minHeight: "100vh",
  color: "#fff",
};

const mainStyle: React.CSSProperties = {
  padding: "20px",
  maxWidth: "400px",
  margin: "0 auto",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.4rem",
  marginBottom: "15px",
  color: "#ffa500",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "#ccc",
};

const errorStyle: React.CSSProperties = {
  color: "#ff4040",
  fontWeight: "bold",
  marginBottom: "16px",
};

const formWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const formItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #999",
  fontSize: "1rem",
  color: "#222",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#ffa500",
  color: "#222",
  border: "none",
  borderRadius: "4px",
  padding: "10px 16px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
};
