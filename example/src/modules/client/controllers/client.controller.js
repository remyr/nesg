import HttpStatus from 'http-status';
import Client from '../models/client.model';

export async function createClient(req, res) {
  try {
    const item = await Client.create(req.body);
    return res.status(HttpStatus.CREATED).json({ data: item });
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: e })
  }
}

export async function getAllClient(req, res) {
  try {
    const items = await Client.find({});
    return res.status(HttpStatus.OK).json({ data: items });
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: e });
  }
}

export async function getClient(req, res) {
  try {
    const item = await Client.findOne({ _id: req.params.id });
    if (!item) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          errors: {
            message: 'Ressource not found',
          },
        });
    }
    return res.status(HttpStatus.OK).json({ data: item });
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: e });
  }
}

export async function removeClient(req, res) {
  try {
    const item = await Client.findById(req.params.id);
    if (!item) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({
          errors: {
            message: 'Ressource not found',
          },
        });
    }
    await item.remove();
    return res.sendStatus(HttpStatus.OK);
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: e });
  }
}
