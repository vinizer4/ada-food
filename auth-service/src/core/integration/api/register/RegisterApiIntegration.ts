import {FindUserApiOutput} from "./output/register.api.output";
import {FindUserByEmailApiInput} from "./input/register.api.input";

export interface RegisterApiIntegration {
    findUserByEmail(input: FindUserByEmailApiInput): Promise<FindUserApiOutput>;
}