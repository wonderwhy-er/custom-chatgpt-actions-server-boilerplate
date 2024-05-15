// exitApplicationHandler.js

/**
 * Handler function to respond with "Hello ChatGPT from Node.js".
 * This function should be attached to a specific route in the main server.
 *
 * @openapi
 * /api/helloworld:
 *   get:
 *     summary: Respond with a hello message.
 *     description: This endpoint returns a "Hello ChatGPT from Node.js" message.
 *     operationId: helloWorld
 *     responses:
 *       '200':
 *         description: A hello message.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello ChatGPT from Node.js
 */
const helloWorldRequestHandler = (req, res) => {
    console.log('Request: Hello World request from ChatGPT');
    res.send("Hello ChatGPT from Node.js. Time is: " + new Date().toString());
};

module.exports = helloWorldRequestHandler;

