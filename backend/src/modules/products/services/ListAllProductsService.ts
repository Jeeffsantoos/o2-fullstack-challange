import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IProducts } from '@modules/products/domain/models/IProducts';

class ListAllProductsService {
  private productsRepository: IProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  public async execute(): Promise<IProducts[]> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export default ListAllProductsService;
