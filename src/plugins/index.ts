import Base, { Plugin, Options } from './base';
import MHGM from './mhgm';
import MHG from './mhg';
import COPY from './copy';
import MHDB from './mhdb';
import DMZJ from './dmzj';
import JMC from './jmc';
import MHM from './mhm';
import KL from './kl';
import NH from './nh';

function initPlugin(options: InitPluginOptions) {
  const dmzj = new DMZJ(options);
  const copy = new COPY(options);
  const mhdb = new MHDB(options);
  const mhg = new MHG(options);
  const mhgm = new MHGM(options);
  const jmc = new JMC(options);
  const mhm = new MHM(options);
  const kl = new KL(options);
  const nh = new NH(options);

  const PluginMap = new Map<Plugin, Base>([
    [dmzj.id, dmzj],
    [copy.id, copy],
    [mhdb.id, mhdb],
    [mhg.id, mhg],
    [mhgm.id, mhgm],
    [jmc.id, jmc],
    [mhm.id, mhm],
    [kl.id, kl],
    [nh.id, nh],
  ]);
  const combineHash = Base.combineHash;
  const splitHash = Base.splitHash;
  const defaultPlugin: Plugin = PluginMap.entries().next().value[0];
  const defaultPluginList = Array.from(PluginMap.values()).map((item) => {
    return {
      label: item.shortName,
      name: item.name,
      value: item.id,
      score: item.score,
      href: item.href,
      userAgent: item.userAgent,
      description: item.description,
      disabled: item.disabled,
    };
  });

  return { Plugin, Options, PluginMap, combineHash, splitHash, defaultPlugin, defaultPluginList };
}

export default initPlugin;
