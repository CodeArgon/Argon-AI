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
export async function registerUserData(data) {
  const url = `${BASE_URL}register/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log(responseData, " && ", responseData.profile_id);
    localStorage.setItem("ProfileId", responseData.profile_id);
    return true;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function registerUserEdu(data, profileID) {
  const authToken = localStorage.getItem("BearerToken");
  const url = `${BASE_URL}education/`;
  const Educationrdata = {
    profile: profileID,
    institute_name: data.institute_name,
    degree: data.degree,
    duration: data.duration,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Educationrdata),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function registerLeadActivities(leadData, profileID, txt) {
  const authToken = localStorage.getItem("BearerToken");
  const url = `${BASE_URL}activity/`;
  const activityData = {
    lead: leadData,
    user: profileID,
    text: txt,
  };

  try {
    console.log(activityData);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("hehehehhehehehehheheh ganoo ", data);
    const leadResponse = await fetch(`${BASE_URL}leads/${leadData}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!leadResponse.ok) {
      console.log("Error");
      throw new Error(`HTTP error! Status: ${leadResponse.status}`);
    } else {
      const emailresult = await registerEmail(leadData, profileID, txt);
      console.log("Email result: ", emailresult);
      return await leadResponse.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function registerEmail(leadData, profileID, txt) {
  const authToken = localStorage.getItem("BearerToken");
  const url = `${BASE_URL}send-email/`;
  const activityData = {
    subject: "No response, Activity notify",
    recipient: [profileID],
    message: txt,
  };

  try {
    console.log("Email data: ", activityData);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response;
    console.log("email Response ", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function registerUserExperience(data, profileID) {
  const authToken = localStorage.getItem("BearerToken");
  const url = `${BASE_URL}work/`;
  const Workdata = {
    profile: profileID,
    company_name: data.company_name,
    job_title: data.job_title,
    start_date: data.start_date,
    end_date: data.end_date,
    location: "Lahore",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Workdata),
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

export async function registerContactActivities(leadData, profileID, txt) {
  const authToken = localStorage.getItem("BearerToken");
  const url = `${BASE_URL}activity/`;
  const activityData = {
    lead: leadData,
    user: profileID,
    text: txt,
  };

  try {
    console.log(activityData);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const leadResponse = await fetch(`${BASE_URL}leads/${leadData}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!leadResponse.ok) {
      console.log("Error");
      throw new Error(`HTTP error! Status: ${leadResponse.status}`);
    } else {
      const emailresult = await registerEmail(leadData, profileID, txt);
      console.log("Email result: ", emailresult);
      return await leadResponse.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
