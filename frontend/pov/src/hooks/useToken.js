export const useToken = (nameToken, duration) => {
  if (nameToken && duration) {
    localStorage.setItem('token', JSON.stringify(nameToken));
    localStorage.setItem('duration', JSON.stringify(duration));
  }

  let token = localStorage.getItem('token');
  const durationToken = localStorage.getItem('duration');
  let errors;

  if (new Date().getTime() > durationToken) {
    //token expired
    localStorage.removeItem('token');
    localStorage.removeItem('duration');
    localStorage.removeItem('user');
    token = null;
    errors = true;
  }

  return { token, errors };
};
