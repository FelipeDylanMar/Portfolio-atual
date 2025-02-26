interface SignUpData {
    email: string;
    password: string;
  }
  
  export async function signUp(userData: SignUpData): Promise<string> {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao cadastrar o usuário");
      }
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error;
    }
  }
  
  interface SignUpData {
    email: string;
    password: string;
  }
  
  export async function login(userData: SignUpData): Promise<string> {
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao cadastrar o usuário");
      }
  
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error;
    }
  }
  