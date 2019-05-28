function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {
        status: "OK",
      };
      resolve(result);
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  if (result.hasOwnProperty("status")) {
    console.log(result.status);
  }
  // expected output: 'resolved'
}

asyncCall();
