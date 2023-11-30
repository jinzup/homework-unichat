document.addEventListener('DOMContentLoaded', function () {
  const inputQuestion = document.getElementById("userInput");
  const result = document.getElementById("response");
  
  inputQuestion.addEventListener("keypress", (e) => {
    if (inputQuestion.value && e.key === "Enter")
      SendQuestion();
  });

  function SendQuestion() {
    var sQuestion = inputQuestion.value;

    fetch("http://127.0.0.1:8081", { // Endpoint do seu servidor proxy
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json;charset=UTF-8',
        Authorization: "Bearer " + "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",
      },
      body: JSON.stringify({
        endpoint: "https://api.openai.com/v1/engines/text-davinci-003/completions", // Endpoint original da API da OpenAI
        apiKey: "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",
        payload: {
          model: "text-davinci-003",
          prompt: sQuestion,
          max_tokens: 2048,
          temperature: 0.5,

        }
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then((json) => {
        if (result.value) result.value += "\n";

        if (json.error?.message) {
          result.value += `Error: ${json.error.message}`;
        } else if (json.choices?.[0]?.text) {
          var text = json.choices[0].text || "Sem resposta";
          result.value += "Chat GPT: " + text;
        } else {
          result.value += "Resposta vazia ou inválida.";
        }
        result.scrollTop = result.scrollHeight;
      }).catch((error) => console.error("Error: ", error))
      .finally(() => {
        inputQuestion.value = "";
        inputQuestion.disabled = false;
        inputQuestion.focus();
      });

    if (result.value) result.value += "\n\n\n";

    result.value += `Eu: ${sQuestion}`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;
    result.scrollTop = result.scrollHeight;
  }
});