import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: "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",
});
const openai = new OpenAIApi(configuration);
export const botController = async (req: Request, res: Response) => {
	const { prompt } = req.body;
	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: prompt,
			temperature: 1,
			max_tokens: 4000,
			top_p: 0,
			frequency_penalty: 0,
			presence_penalty: 0,
		});

		return res.status(200).send({
			bot: response.data.choices[0].text,
		});
	} catch (error: any) {
		return res.status(500).json({ msg: "server bị lỗi" });
	}
};
