
import { CanActivateFn } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export function authenticationGuard(): CanActivateFn {
    return () => {
      const oauthService: AuthService = inject(AuthService);

      if (oauthService.hasAccess() ) {
        return true;
      }
      oauthService.login();
      return false;
    };
  }