import './commands'
import '@cypress/code-coverage/support'

import '../../src/assets/main.css';

import { mount } from 'cypress/vue'
Cypress.Commands.add('mount', mount)
