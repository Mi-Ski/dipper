// niezabezpieczony endpoint, "api-key" zamiast jwtTokenString: accessToken 
export default async function handler(req, res) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
			"api-key":  process.env.API_KEY_GETALL,
    },
  };
  const fetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE,
    database: "test",
    collection: "tweets",
  };
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;
	const {skip, limit} = req.query;

  try {
    switch (req.method) {
      case "GET":
        const readData = await fetch(`${baseUrl}/find`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            sort: { postedAt: -1 },
						skip: parseInt(skip),
						limit: parseInt(limit)
          }),
        });
        const readDataJson = await readData.json();
        res.status(200).json(readDataJson);
        break;
      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}