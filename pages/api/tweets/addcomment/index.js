import {
  getAccessToken,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      jwtTokenString: accessToken,
    },
  };
  const fetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE,
    database: "test",
    collection: "tweets",
  };
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

  try {
    const updateData = await fetch(`${baseUrl}/updateOne`, {
      ...fetchOptions,
      body: JSON.stringify({
        ...fetchBody,
        filter: { _id: { $oid: req.body.postId } },
        update: {
          $push: {
            comments: req.body.body,
          },
        },
      }),
    });
    const updateDataJson = await updateData.json();
    res.status(200).json(updateDataJson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
