import { routes } from './app.routes';
import { UsersComponent } from './users/users.component';


describe('routes', () => {
    it('should contain the route for /users', () => {
        expect(routes).toContain({ path: 'users', component: UsersComponent });
    });
});
