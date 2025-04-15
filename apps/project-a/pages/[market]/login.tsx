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
      <Header market={market} />
      <main style={mainStyle}>
        <h1 style={titleStyle}>Login – Market: {market}</h1>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        <form method="POST" style={formStyle}>
          <div style={formRowStyle}>
            <label style={labelStyle}>
              Username:
              <input name="username" style={inputStyle} />
            </label>
          </div>
          <div style={formRowStyle}>
            <label style={labelStyle}>
              Password:
              <input name="password" type="password" style={inputStyle} />
            </label>
          </div>
          <button type="submit" style={buttonStyle}>Log in</button>
        </form>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<LoginProps> = async (ctx) => {
  const { market } = ctx.params!;
  const method = ctx.req.method;

  const props: LoginProps = { market: market as string };

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
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f0f0f0",
  minHeight: "100vh"
};

const mainStyle: React.CSSProperties = {
  padding: "20px"
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.3rem",
  marginBottom: "15px"
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "#333"
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "300px"
};

const formRowStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column"
};

const labelStyle: React.CSSProperties = {
  fontWeight: "bold",
  marginBottom: "4px"
};

const inputStyle: React.CSSProperties = {
  padding: "6px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "1rem"
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "8px 12px",
  cursor: "pointer",
  fontSize: "1rem"
};
