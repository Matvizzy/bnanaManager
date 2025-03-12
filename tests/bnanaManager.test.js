import { bananaManager } from '../src/bnanaManager.js';

describe('bananaManager', () => {
  let manager;

  beforeEach(() => {
    manager = bananaManager();
  });

  test('addBanana should add a new banana', () => {
    manager.addBanana(8);
    const bananas = manager.getBananas();
    expect(bananas.length).toBe(1);
    expect(bananas[0].freshness).toBe(8);
  });

  test('addBanana should throw an error if freshness is out of range', () => {
    expect(() => manager.addBanana(-1)).toThrow('Свежесть банана должна быть от 0 до 10');
    expect(() => manager.addBanana(11)).toThrow('Свежесть банана должна быть от 0 до 10');
  });

  test('removeBanana should remove a banana by id', () => {
    manager.addBanana(8);
    const bananasBefore = manager.getBananas();
    manager.removeBanana(bananasBefore[0].id);
    const bananasAfter = manager.getBananas();
    expect(bananasAfter.length).toBe(0);
  });

  test('removeBanana should not throw an error if banana with id does not exist', () => {
    expect(() => manager.removeBanana(999)).not.toThrow();
  });

  test('getBananas should return all bananas', () => {
    manager.addBanana(8);
    manager.addBanana(5);
    const bananas = manager.getBananas();
    expect(bananas.length).toBe(2);
  });

  test('distributeBananas should distribute bananas to users', () => {
    manager.addBanana(8);
    manager.addBanana(5);
    const users = ['User1', 'User2'];
    const distributed = manager.distributeBananas(users);
    expect(distributed.length).toBe(2);
    expect(distributed[0].user).toBe('User1');
    expect(distributed[1].user).toBe('User2');
  });

  test('distributeBananas should throw an error if not enough bananas', () => {
    manager.addBanana(8);
    const users = ['User1', 'User2'];
    expect(() => manager.distributeBananas(users)).toThrow('Недостаточно бананов для всех пользователей');
  });

  test('sortBananasByFreshness should sort bananas by freshness', () => {
    manager.addBanana(5);
    manager.addBanana(8);
    manager.sortBananasByFreshness();
    const bananas = manager.getBananas();
    expect(bananas[0].freshness).toBe(8);
    expect(bananas[1].freshness).toBe(5);
  });

  test('removeSpoiledBananas should remove spoiled bananas', () => {
    manager.addBanana(0);
    manager.addBanana(5);
    const spoiled = manager.removeSpoiledBananas();
    const bananas = manager.getBananas();
    expect(bananas.length).toBe(1);
    expect(spoiled.length).toBe(1);
    expect(spoiled[0].freshness).toBe(0);
  });

  test('getBananaStatistics should return correct statistics', () => {
    manager.addBanana(8);
    manager.addBanana(5);
    const stats = manager.getBananaStatistics();
    expect(stats.total).toBe(2);
    expect(stats.averageFreshness).toBe(6.5);
  });

  test('getActionsLog should return the log of all actions', () => {
    manager.addBanana(8);
    manager.removeBanana(manager.getBananas()[0].id);
    const log = manager.getActionsLog();
    expect(log.length).toBe(2);
    expect(log[0].type).toBe('ADD');
    expect(log[1].type).toBe('REMOVE');
  });
});