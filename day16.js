const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\r\n");

const ruleNumbers = lines
  .slice(0, 20)
  .join("\n")
  .match(/([0-9]+)/g);
const rules = ruleNumbers
  .map((el, i) => {
    if (i % 4 === 0) {
      return (
        "ruleInput >= " +
        el +
        " && " +
        ruleNumbers[i + 1] +
        " >= ruleInput || ruleInput >= " +
        ruleNumbers[i + 2] +
        " && " +
        ruleNumbers[i + 3] +
        " >= ruleInput"
      );
    }
  })
  .filter((x) => x);

const nearbyIndex = lines.findIndex((x) => x === "nearby tickets:");
const nearbyTickets = lines.slice(nearbyIndex + 1);
const numbers = nearbyTickets.join(",").split(",");

const naughtyNumbers = numbers.filter((ruleInput) => {
  return !rules.some((rule) => {
    return eval(rule);
  });
});

// Step One
console.log(naughtyNumbers.reduce((a, b) => a + parseInt(b), 0));

const validTickets = nearbyTickets
  .filter(
    (ticket) =>
      !ticket.split(",").some((ruleInput) => !rules.some((rule) => eval(rule)))
  )
  .map((x) => x.split(","));

locationObject = {};
for (i = 0; i < validTickets[0].length; i++) {
  const ruleIndex = rules.findIndex((rule) =>
    validTickets.every((ticket) => {
      const ruleInput = ticket[i];
      return eval(rule);
    })
  );
  locationObject[i] = ruleIndex;
}
console.log(
  validTickets.every((ticket) => {
    const ruleInput = ticket[0];
    return (
      (ruleInput >= 44 && 825 >= ruleInput) ||
      (ruleInput >= 849 && 962 >= ruleInput)
    );
  })
);
