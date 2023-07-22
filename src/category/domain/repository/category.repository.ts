import { SearchableRepositoryInterface } from "../../../@seedwork/domain/repository/repository-contracts";
import { Category } from "../entities/category";

// Essa interface servirá para caso a categoria tenha especificamente a necessidade de 
// ter outros métodos além dos já definidos em RepositoryInterface. Se for necessário
export default interface CategoryRepository extends SearchableRepositoryInterface<Category, any, any>{}