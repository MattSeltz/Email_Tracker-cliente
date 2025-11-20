export const getEmails = async () => {
  try {
    const res = await fetch(
      `/api/email?userId=${localStorage.getItem("userId")}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const saveEmail = async (email: string, rubro: string) => {
  try {
    await fetch(`/api/email`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email,
        rubro,
        userId: localStorage.getItem("userId"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const editIsSend = async (id: number, isSend: boolean) => {
  try {
    await fetch(`/api/email/send/${id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ send: isSend }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteEmail = async (id: number) => {
  try {
    await fetch(`/api/email/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

export const verifyCodeEmail = async (
  code: string,
  emailFromQuery: string | null
) => {
  try {
    const res = await fetch(
      `/api/recovery/verify-code/${code}?email=${emailFromQuery}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (
  password: string,
  email: string | null
) => {
  try {
    const res = await fetch(`/api/recovery/update-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });

    return res.ok;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return { isSuccess: res.ok, data };
  } catch (error) {
    console.error(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return { isSuccess: res.ok, data };
  } catch (error) {
    console.error(error);
  }
};

export const sendEmail = async (email: string) => {
  try {
    const res = await fetch(`/api/recovery/send-email`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.ok;
  } catch (error) {
    console.error(error);
  }
};
