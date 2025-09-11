import { Feather } from "@expo/vector-icons";


export const getIconName = (routeName: string, focused: boolean) => {
          switch (routeName) {
            case 'home':
              return 'check';
            case 'stats':
              return 'bar-chart-2';
            case 'settings':
              return 'settings';
            default:
              return 'home';
          }
        };
