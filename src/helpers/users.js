import { BASE_URL } from "../constants/urls";

export async function registerUser(data) {
  const url = `${BASE_URL}register/`;
  const Registerdata = {
    username: data.email,
    password: data.password,
    email: data.email,
    role: data.role,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Registerdata),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function loginUser(data) {
  const url = `${BASE_URL}login/`;
  const logindata = {
    username: data.email,
    password: data.password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    localStorage.setItem("BearerToken", responseData.access);
    localStorage.setItem("UserRole", responseData.role);
    localStorage.setItem("user", JSON.stringify(responseData));

    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export async function logoutUser() {
  const authToken = localStorage.getItem("BearerToken");
  const url = `${BASE_URL}logout/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchCurrentUser() {
  const authToken = localStorage.getItem("BearerToken");
  const url = `${BASE_URL}current-user/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Current User is that:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function requestPasswordReset(data) {
  const url = `${BASE_URL}password-reset/`;
  const passworddata = {
    email: data,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passworddata),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Password reset email sent:", result);
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
