const fs = require('fs');
const util = require('util');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    'What is the name of the project? ', // title
    'What is the project about, what features and technology does it offer, and what problem does it solve? ', // description
    'How can a user install and set up the project? ', // installation
    'How can the user run the project? ', // usage
    'How can the user contribute to the project? ', // contributing
    'Are there any known issues or bugs that users should be aware of? ', // tests
    'How can the user contact the project owner or community for support or further information? ', // questions
    'What is the project license? ', // license
    'What is your GitHub username? ', // GitHub username
    'What is your Email? ', // Email
];

const badgeIcons = [

'[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
'[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
'[![License: GPL v3.0](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
'[![License: BSD-2-Clause](https://img.shields.io/badge/License-BSD%202--Clause%20%22Simplified%22-blue.svg)](https://opensource.org/licenses/BSD-2-Clause)',
'[![License: BSD-3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
'[![License: Boost Software License 1.0](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)',
'[![License: CC0 1.0 Universal (CC0 1.0)](https://img.shields.io/badge/License-CC0%201.0%20Universal-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)',
'[![License: EPL 2.0](https://img.shields.io/badge/License-EPL%202.0-red.svg)](https://opensource.org/licenses/EPL-2.0.php)',
'[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)',
'[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/gpl-2.0)',
'[![License: LGPL v2.1](https://img.shields.io/badge/License-LGPL%20v2.1-blue.svg)](https://www.gnu.org/licenses/lgpl-2.1)',
'[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://www.mozilla.org/en-US/MPL/2.0/)',
'[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'

]

const licenseBadgeMap = {
    "MIT": badgeIcons[0],
    "Apache 2.0": badgeIcons[1],
    "GPL v3.0": badgeIcons[2],
    "BSD-2-Clause": badgeIcons[3],
    "BSD-3-Clause": badgeIcons[4],
    "Boost Software License 1.0": badgeIcons[5],
    "CC0 1.0 Universal (CC0 1.0)": badgeIcons[6],
    "EPL 2.0": badgeIcons[7],
    "AGPL v3": badgeIcons[8],
    "GPL v2": badgeIcons[9],
    "LGPL v2.1": badgeIcons[10],
    "MPL 2.0": badgeIcons[11],
    "Unlicense": badgeIcons[12]
};

// Used to convert the readline.question method into a Promise-based function, so that it can be used with async/await.
// Used bind to connect readline object to askQuestion so that a new function can be called to read user input from CMD
const askQuestion = util.promisify(readline.question).bind(readline);

async function writeToFile(fileName, data) {
    try {
        const title = await askQuestion(questions[0]);
        const tableOfContents = `## Table of Contents\n\n` 
        + ` • [Description](#description)\n\n` 
        + ` • [Installation](#installation)\n\n`
        + ` • [Usage](#usage)\n\n`
        + ` • [Contributing](#contributing)\n\n`
        + ` • [Tests](#tests)\n\n`
        + ` • [Questions](#questions)\n\n`
        + ` • [License](#license)\n\n`;
        const description = await askQuestion(questions[1]);
        const installation = await askQuestion(questions[2]);
        const usage = await askQuestion(questions[3]);
        const contributing = await askQuestion(questions[4]);
        const tests = await askQuestion(questions[5]);
        const readMeQuestions = await askQuestion(questions[6]);
        const license = await askQuestion(questions[7]);
        const username = await askQuestion(questions[8]);
        const email = await askQuestion(questions[9]);
        const badge = licenseBadgeMap[license];
        const content = `${badge}\n\n# ${title}\n\n` + tableOfContents + `## Description\n\n${description}\n\n` + `## Installation\n\n${installation}\n\n` + `## Usage\n\n${usage}\n\n` + `## Contributing\n\n${contributing}\n\n` + `## Tests\n\n${tests}\n\n` + `## Questions\n\n${readMeQuestions}\n[GitHub](https://github.com/${username}/)\nPlease reach out and email me down below if you have any additional questions about the program.\n[Email](mailto:${email})\n\n` + `## License\n\nThis project is licensed under the ${license}\n\n`;
        fs.appendFileSync(fileName, content, 'utf8');
        console.log('Data appended to file.');
    } catch (err) {
        console.error(err);
    } finally {
        readline.close();
    }
}

// Writes to file once all the questions are finished
async function init() {
    await writeToFile('README.md');
}

init();
